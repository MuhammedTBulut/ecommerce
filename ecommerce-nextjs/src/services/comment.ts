import { BaseService, IHttpClient } from './base';
import { ProductComment, PaginatedResponse, ApiResponse } from '@/types';

/**
 * Comment DTOs
 */
export interface CreateCommentDTO {
  productId: number;
  content: string;
  rating: number;
}

export interface UpdateCommentDTO {
  content?: string;
  rating?: number;
}

export interface CommentFilterParams {
  page?: number;
  pageSize?: number;
  productId?: number;
  userId?: number;
  isApproved?: boolean;
  rating?: number;
  sortBy?: 'createdAt' | 'rating' | 'helpful';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Comment Service Interface
 */
export interface ICommentService {
  getComments(params?: CommentFilterParams): Promise<PaginatedResponse<ProductComment>>;
  getCommentById(id: number): Promise<ProductComment>;
  createComment(comment: CreateCommentDTO): Promise<ProductComment>;
  updateComment(id: number, comment: UpdateCommentDTO): Promise<ProductComment>;
  deleteComment(id: number): Promise<void>;
  getProductComments(productId: number, params?: CommentFilterParams): Promise<PaginatedResponse<ProductComment>>;
  getUserComments(userId?: number, params?: CommentFilterParams): Promise<PaginatedResponse<ProductComment>>;
  reportComment(id: number, reason: string): Promise<void>;
  likeComment(id: number): Promise<void>;
  unlikeComment(id: number): Promise<void>;
}

/**
 * Admin Comment Service Interface
 */
export interface IAdminCommentService {
  getAllComments(params?: CommentFilterParams): Promise<PaginatedResponse<ProductComment>>;
  approveComment(id: number): Promise<ProductComment>;
  rejectComment(id: number, reason?: string): Promise<ProductComment>;
  bulkApproveComments(commentIds: number[]): Promise<void>;
  bulkRejectComments(commentIds: number[], reason?: string): Promise<void>;
  getPendingComments(): Promise<ProductComment[]>;
  getReportedComments(): Promise<ProductComment[]>;
  getCommentStatistics(): Promise<CommentStatistics>;
}

/**
 * Comment statistics interface
 */
export interface CommentStatistics {
  totalComments: number;
  approvedComments: number;
  pendingComments: number;
  rejectedComments: number;
  averageRating: number;
  commentsByRating: Record<number, number>;
  commentsToday: number;
  commentsThisWeek: number;
  commentsThisMonth: number;
  topRatedProducts: Array<{
    productId: number;
    productName: string;
    averageRating: number;
    commentCount: number;
  }>;
}

/**
 * Comment Service implementation
 */
export class CommentService extends BaseService implements ICommentService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get comments with filtering and pagination
   */
  async getComments(params: CommentFilterParams = {}): Promise<PaginatedResponse<ProductComment>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ProductComment[]>(
        `/ProductComments${queryString}`
      );
      
      // Convert simple array response to paginated format
      return {
        data: response || [],
        totalCount: (response || []).length,
        pageNumber: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: Math.ceil((response || []).length / (params.pageSize || 10))
      };
    }, 'Failed to fetch comments');
  }

  /**
   * Get single comment by ID
   */
  async getCommentById(id: number): Promise<ProductComment> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ProductComment>(
        `/ProductComments/${id}`
      );
      
      return response;
    }, `Failed to fetch comment with ID: ${id}`);
  }

  /**
   * Create new comment
   */
  async createComment(comment: CreateCommentDTO): Promise<ProductComment> {
    this.validateRequired(comment, ['productId', 'content', 'rating']);

    if (comment.rating < 1 || comment.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ProductComment>(
        `/ProductComments?productId=${comment.productId}`,
        {
          content: comment.content,
          rating: comment.rating
        }
      );
      
      return response;
    }, 'Failed to create comment');
  }

  /**
   * Update existing comment
   */
  async updateComment(id: number, comment: UpdateCommentDTO): Promise<ProductComment> {
    this.validateRequired({ id }, ['id']);

    if (comment.rating && (comment.rating < 1 || comment.rating > 5)) {
      throw new Error('Rating must be between 1 and 5');
    }

    return this.handleRequest(async () => {
      const response = await this.httpClient.put<ApiResponse<ProductComment>>(
        `/comments/${id}`,
        comment
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update comment');
    }, `Failed to update comment: ${id}`);
  }

  /**
   * Delete comment
   */
  async deleteComment(id: number): Promise<void> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<void>>(
        `/comments/${id}`
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete comment');
      }
    }, `Failed to delete comment: ${id}`);
  }

  /**
   * Get comments for a specific product
   */
  async getProductComments(
    productId: number, 
    params: CommentFilterParams = {}
  ): Promise<PaginatedResponse<ProductComment>> {
    this.validateRequired({ productId }, ['productId']);

    return this.handleRequest(async () => {
      const queryParams = { ...params, productId };
      const queryString = this.buildQueryParams(queryParams);
      
      const response = await this.httpClient.get<ProductComment[]>(
        `/ProductComments/product/${productId}${queryString}`
      );
      
      // Convert simple array response to paginated format
      return {
        data: response || [],
        totalCount: (response || []).length,
        pageNumber: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: Math.ceil((response || []).length / (params.pageSize || 10))
      };
    }, `Failed to fetch comments for product: ${productId}`);
  }

  /**
   * Get comments by a specific user
   */
  async getUserComments(
    userId?: number, 
    params: CommentFilterParams = {}
  ): Promise<PaginatedResponse<ProductComment>> {
    return this.handleRequest(async () => {
      const endpoint = userId ? `/users/${userId}/comments` : '/comments/my-comments';
      const queryString = this.buildQueryParams(params);
      
      const response = await this.httpClient.get<PaginatedResponse<ProductComment>>(
        `${endpoint}${queryString}`
      );
      
      return response;
    }, userId ? `Failed to fetch comments for user: ${userId}` : 'Failed to fetch user comments');
  }

  /**
   * Report a comment
   */
  async reportComment(id: number, reason: string): Promise<void> {
    this.validateRequired({ id, reason }, ['id', 'reason']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<void>>(
        `/comments/${id}/report`,
        { reason }
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to report comment');
      }
    }, `Failed to report comment: ${id}`);
  }

  /**
   * Like a comment
   */
  async likeComment(id: number): Promise<void> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<void>>(
        `/comments/${id}/like`
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to like comment');
      }
    }, `Failed to like comment: ${id}`);
  }

  /**
   * Unlike a comment
   */
  async unlikeComment(id: number): Promise<void> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<void>>(
        `/comments/${id}/like`
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to unlike comment');
      }
    }, `Failed to unlike comment: ${id}`);
  }

  /**
   * Get product rating summary
   */
  async getProductRatingSummary(productId: number): Promise<{
    averageRating: number;
    totalComments: number;
    ratingDistribution: Record<number, number>;
  }> {
    this.validateRequired({ productId }, ['productId']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<{
        averageRating: number;
        totalComments: number;
        ratingDistribution: Record<number, number>;
      }>(`/ProductComments/product/${productId}/rating-summary`);
      
      return response;
    }, `Failed to get rating summary for product: ${productId}`);
  }
}

/**
 * Admin Comment Service implementation
 */
export class AdminCommentService extends BaseService implements IAdminCommentService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get all comments (admin view)
   */
  async getAllComments(params: CommentFilterParams = {}): Promise<PaginatedResponse<ProductComment>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<PaginatedResponse<ProductComment>>(
        `/admin/comments${queryString}`
      );
      
      return response;
    }, 'Failed to fetch all comments');
  }

  /**
   * Approve a comment
   */
  async approveComment(id: number): Promise<ProductComment> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<ProductComment>>(
        `/admin/comments/${id}/approve`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to approve comment');
    }, `Failed to approve comment: ${id}`);
  }

  /**
   * Reject a comment
   */
  async rejectComment(id: number, reason?: string): Promise<ProductComment> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<ProductComment>>(
        `/admin/comments/${id}/reject`,
        { reason }
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to reject comment');
    }, `Failed to reject comment: ${id}`);
  }

  /**
   * Bulk approve comments
   */
  async bulkApproveComments(commentIds: number[]): Promise<void> {
    this.validateRequired({ commentIds }, ['commentIds']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<void>>(
        '/admin/comments/bulk-approve',
        { commentIds }
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to bulk approve comments');
      }
    }, 'Failed to bulk approve comments');
  }

  /**
   * Bulk reject comments
   */
  async bulkRejectComments(commentIds: number[], reason?: string): Promise<void> {
    this.validateRequired({ commentIds }, ['commentIds']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<void>>(
        '/admin/comments/bulk-reject',
        { commentIds, reason }
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to bulk reject comments');
      }
    }, 'Failed to bulk reject comments');
  }

  /**
   * Get pending comments
   */
  async getPendingComments(): Promise<ProductComment[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<ProductComment[]>>(
        '/admin/comments/pending'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch pending comments');
    }, 'Failed to fetch pending comments');
  }

  /**
   * Get reported comments
   */
  async getReportedComments(): Promise<ProductComment[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<ProductComment[]>>(
        '/admin/comments/reported'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch reported comments');
    }, 'Failed to fetch reported comments');
  }

  /**
   * Get comment statistics
   */
  async getCommentStatistics(): Promise<CommentStatistics> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<CommentStatistics>>(
        '/admin/comments/statistics'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch comment statistics');
    }, 'Failed to fetch comment statistics');
  }
}