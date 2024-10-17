export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: '王海平',
    avatar: '',
    username: 'onhaiping',
    title: '不知名的代码搬运工',
    desc: '开发者，专注于AI+嵌入式，数据分析，后端、自动化相关开发',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/OnHaiping' },
      { type: 'instagram', icon: 'instagram', link: 'https://www.instagram.com/haipingnn/' },
    ],
    nameAliases: ['海平', '王海平', 'haiping', 'Onhaiping'],
    emailAliases: ['a15066577233@gmail.com'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
