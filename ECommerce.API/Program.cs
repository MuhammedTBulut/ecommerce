using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder; // Added this namespace for WebApplication
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using ECommerce.Infrastructure.Data;
using ECommerce.Application.Interfaces.Repositories;
using ECommerce.Infrastructure.Repositories;
using ECommerce.Application.Interfaces.Services;
using ECommerce.Application.Services;
using ECommerce.Infrastructure.Services;
using ECommerce.Application.Interfaces.Strategies.Payment;
using ECommerce.Application.Interfaces.Strategies.Shipping;
using ECommerce.Infrastructure.Strategies.Payment;
using ECommerce.Infrastructure.Strategies.Shipping;
using ECommerce.Application.Services.Strategies;
using ECommerce.Application.Interfaces.Factories;
using ECommerce.Application.Factories;

var builder = WebApplication.CreateBuilder(args);

// 1. PostgreSQL veritabanı bağlantısı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Repository Pattern - Register repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();

// 3. Factory Pattern - Register factories
builder.Services.AddScoped<IUserFactory, UserFactory>();
builder.Services.AddScoped<IProductFactory, ProductFactory>();
builder.Services.AddScoped<IOrderFactory, OrderFactory>();

// 4. Service Layer - Register services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<ECommerce.Application.Services.Interfaces.IActionLogger, ActionLoggerService>();

// 5. Strategy Pattern - Register payment strategies
builder.Services.AddScoped<IPaymentStrategy, CreditCardPaymentStrategy>();
builder.Services.AddScoped<IPaymentStrategy, BankTransferPaymentStrategy>();
builder.Services.AddScoped<IPaymentStrategy, CashOnDeliveryPaymentStrategy>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

// 6. Strategy Pattern - Register shipping strategies
builder.Services.AddScoped<IShippingStrategy, StandardShippingStrategy>();
builder.Services.AddScoped<IShippingStrategy, ExpressShippingStrategy>();
builder.Services.AddScoped<IShippingStrategy, EconomicShippingStrategy>();
builder.Services.AddScoped<IShippingService, ShippingService>();

// 7. JWT Authentication (Token Doğrulama)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            ),
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.Zero
        };
    });

// 8. Yetkilendirme
builder.Services.AddAuthorization();

// 9. CORS Ayarı (Next.js'den erişim için)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 10. Swagger (API Dokümantasyonu + JWT desteği)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.SwaggerDoc("v1", new() { Title = "ECommerce API", Version = "v1" });

    config.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT yetkilendirme: 'Bearer {token}' şeklinde girin",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    config.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new List<string>()
        }
    });
});

// 11. MVC Controller desteği
builder.Services.AddControllers();


var app = builder.Build();

// DEBUG AMAÇLI: Şifre hash örneği
var hash = BCrypt.Net.BCrypt.HashPassword("password123");
Console.WriteLine($"Hashed: {hash}");

// 1. Swagger (geliştirme modunda API test arayüzü)
app.UseSwagger();
app.UseSwaggerUI(config =>
{
    config.SwaggerEndpoint("/swagger/v1/swagger.json", "ECommerce API v1");
    config.RoutePrefix = string.Empty;
    config.DocumentTitle = "ECommerce API Dökümantasyonu";
});

// 🔐 2. CORS → 3. Authentication → 4. Authorization
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// 5. Controller route mapping
app.MapControllers();

app.Run();