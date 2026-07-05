'use server'

import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/slugify'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function inferPlatform(link: string): string {
  const lower = link.toLowerCase()
  if (lower.includes('amazon') || lower.includes('amzn')) return 'Amazon'
  if (lower.includes('flipkart')) return 'Flipkart'
  if (lower.includes('meesho')) return 'Meesho'
  if (lower.includes('myntra')) return 'Myntra'
  if (lower.includes('ajio')) return 'Ajio'
  return 'Other'
}

export async function addCategory(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = (formData.get('slug') as string) || slugify(name)
  const display_order = parseInt(formData.get('display_order') as string) || 0

  let image_url = (formData.get('image_url') as string) || ''

  if (!image_url) {
    const file = formData.get('image_file') as File
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)
      if (uploadError) throw new Error(uploadError.message)
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName)
      image_url = publicUrl
    }
  }

  const { error } = await supabase.from('categories').insert({
    name,
    slug,
    image_url: image_url || null,
    display_order,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/categories')
  revalidatePath('/')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  revalidatePath('/')
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const slug = slugify(title)
  const short_description = formData.get('short_description') as string
  const affiliate_link = formData.get('affiliate_link') as string
  const category_id = formData.get('category_id') as string
  const platform_id = formData.get('platform_id') as string
  const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on'
  const handmade = formData.get('handmade') === 'true' || formData.get('handmade') === 'on'

  let image_url = (formData.get('image_url') as string) || ''

  if (!image_url) {
    const file = formData.get('image_file') as File
    if (!file || file.size === 0) {
      throw new Error('Please upload a product image.')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)
    if (uploadError) throw new Error(uploadError.message)
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName)
    image_url = publicUrl
  }

  // Fetch platform name from platforms table
  let platform_name = null
  if (platform_id) {
    const { data: platform } = await supabase.from('platforms').select('name').eq('id', platform_id).single()
    platform_name = platform?.name
  }

  const data = {
    title,
    slug,
    short_description,
    image_url,
    affiliate_link,
    platform_id,
    platform_name,
    category_id,
    badge: null,
    featured,
    handmade,
    display_order: 0,
  }

  if (data.featured) {
    await supabase.from('products').update({ featured: false }).neq('id', '00000000-0000-0000-0000-000000000000')
  }

  const { error } = await supabase.from('products').insert(data)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
  revalidatePath('/')
}

export async function addPlatform(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const display_order = parseInt(formData.get('display_order') as string) || 0

  const { error } = await supabase.from('platforms').insert({
    name,
    display_order,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/products')
  revalidatePath('/')
  redirect('/admin/products')
}

export async function deletePlatform(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('platforms').delete().eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
  revalidatePath('/')
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()
  const value = {
    website_name: formData.get('website_name') as string,
    tagline: formData.get('tagline') as string,
    instagram_url: formData.get('instagram_url') as string,
    pinterest_url: formData.get('pinterest_url') as string,
    whatsapp_url: formData.get('whatsapp_url') as string,
    contact_email: formData.get('contact_email') as string,
  }

  const { error } = await supabase.from('settings').upsert({ key: 'site_config', value })

  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
}
