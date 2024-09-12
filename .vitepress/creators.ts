export interface SocialEntry {
  type: 'github' | 'instagram' | 'email'
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
    username: 'nekomeowww',
    title: '王海平',
    desc: '开发者，专注于机器学习，数据分析，嵌入式，边缘计算，自动化',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/OnHaiping' },
      { type: 'Ins', icon: 'instagram', link: 'https://www.instagram.com/haipingnn/' },
    ],
    nameAliases: ['Onhaiping', '王海平', '王海平', 'Onhaiping', 'Onhaiping'],
    emailAliases: ['a15066577233@gmail.com'],
  },
  {
    name: '王海平',
    avatar: '',
    username: 'nekomeowww',
    title: '王海平',
    desc: '开发者，专注于机器学习，数据分析，嵌入式，边缘计算，自动化',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/OnHaiping' },
      { type: 'Ins', icon: 'instagram', link: 'https://www.instagram.com/haipingnn/' },
    ],
    nameAliases: ['Onhaiping', '王海平', '王海平', 'Onhaiping', 'Onhaiping'],
    emailAliases: ['a15066577233@gmail.com'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
