'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth'
import { RegisterRequest } from '@/types'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuthStore()
  const [formData, setFormData] = useState<RegisterRequest>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: undefined,
    birthDate: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen gerekli alanları doldurun')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    try {
      await register(formData)
      router.push('/')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Kayıt başarısız')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               name === 'gender' ? (value === '' ? undefined : value === 'true') : value
    }))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
            <CardDescription>
              Yeni bir hesap oluşturun ve alışverişe başlayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Ad Soyad *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-posta *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Şifre *
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  En az 6 karakter olmalıdır
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Şifre Tekrar *
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">
                  Cinsiyet (Opsiyonel)
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender === undefined ? '' : formData.gender.toString()}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="">Seçiniz</option>
                  <option value="true">Erkek</option>
                  <option value="false">Kadın</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="birthDate" className="text-sm font-medium">
                  Doğum Tarihi (Opsiyonel)
                </label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Kayıt oluşturuluyor...' : 'Kayıt Ol'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Kayıt olarak <Link href="/terms" className="text-primary hover:underline">Kullanım Şartları</Link> ve{' '}
                <Link href="/privacy" className="text-primary hover:underline">Gizlilik Politikası</Link>&apos;nı kabul etmiş olursunuz.
              </p>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Zaten hesabınız var mı? </span>
              <Link href="/login" className="text-primary hover:underline">
                Giriş yapın
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}