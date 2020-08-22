// create by d1y<chenhonzhou@gmail.com>

// ===

const testLink = link=> {
  const regex = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
  return regex.test(link)
}

const isObject = x => {
  return typeof x === 'object' && x !== null
}

const isGithubRepo = repo => {
  const regex = /(https|git@[-\w.]+):(\/\/)?(.*?)(\/?|[-\d\w._]+?)$/
  const isRepo = /^(?!.*https|git).*\w+(\/)\w+.*$/
  return regex.test(repo) || isRepo.test(repo)
}

const githubSiteTest = link=> {
  const x = /(github\.(io|com)|raw\.githubusercontent\.com)/
  return [x.test(link), x]
}

// https://d1y. => d1y
const formatIoUserName = link=> {
  const l = /(http|https):\/\//.exec(link)
  const p = l[1]
  const lenZero = link.length - 1
  let result
  if (p === 'http') {
    result = link.substring(7, lenZero)
  } else if (p === 'https') {
    result = link.substring(8, lenZero)
  }
  return result
}

const isLink = link=> {

  // https://iptv-org.github.io/iptv/index.m3u
  // https://github.com/video-dev/hls.js/blob/master/src/empty.js
  // https://raw.githubusercontent.com/bukinoshita/is-github-repo/master/package.json

  if (!testLink(link)) return false
  const [ isGithubLink, regex ] = githubSiteTest(link)
  if (isGithubLink) {
    const result = {
      username: '',
      repo: '',
      branch: 'master',
      path: ''
    }
    const pm = regex.exec(link)
    const site = pm[0]
    const index = pm['index']
    const siteLen = site.length
    const data = link.substring(index + siteLen)
    const sp = data.substring(1).split('/')
    if (site === 'github.com' || site === 'raw.githubusercontent.com') {
      result['username'] = sp[0]
      result['repo'] = sp[1]
    }
    if (site === 'github.io')  {
      // https://d1y. => d1y
      const user = formatIoUserName(link.substring(0, index))
      result['username'] = user
      const linkAddOneLen = index + siteLen
      const seg = link.substr(linkAddOneLen, 1)
      if (seg === '/') {
        // iptv/index.m3u => iptv
        const info = link.substring(linkAddOneLen + 1)
        const split = info.split('/')
        const repo = split[0]
        result['repo'] = repo
        result['branch'] = 'gh-pages'
        // iptv/index.m3u => index.m3u
        let path = info.substring(repo.length + 1)
        if (path[0] === '/') path = path.substring(1)
        result['path'] = path
        return result
      }
    } else if (site === 'github.com') {
      if (data[0] === '/') {
        if (sp[2] === 'blob') {
          result['branch'] = sp[3]
          result['path'] = sp.filter((item, index)=> {
            return index > 3
          }).join('/')
          return result
        }
      }
    } else if (site === 'raw.githubusercontent.com') {
      if (data[0] === '/') {
        result['branch'] = sp[2]
        result['path'] = sp.filter((item, index)=> {
          return index > 2
        }).join('/')
        return result
      }
    }
  }
  return false
}

const toCDNLink = link=> {
  let result = {}
  if (isObject(link)) {
    if (link.hasOwnProperty('username')) {
      result['username'] = link['username']
    } else {
      result['username'] = 'd1y'
    }
    if (link.hasOwnProperty('repo')) {
      result['repo'] = link['repo']
    } else {
      result['repo'] = 'ass-we-can'
    }
    if(link.hasOwnProperty('path')) {
      result['path'] = link['path']
    } else {
      result['path'] = 'src/lite.json'
    }
    if (link.hasOwnProperty('branch')) {
      result['branch'] = link['branch']
    }
  } else if (typeof link === 'string') {
    const data = isLink(link)
    if (!data) return false
    result = data
  } else return false
  let s =`https://cdn.jsdelivr.net/gh/${ result.username }/${ result.repo }`
  const b = `@${ result.branch }/`
  s += `${ result.branch ? b : '/' }${ result.path }`
  return s
}

// ===

// create github api
const createGithubApi = path=> {
  return `https://api.github.com/${ path }`
}

const username = `laynH`
const repo = `Anime-Girls-Holding-Programming-Books`

const gitTree = createGithubApi(`repos/${ username }/${ repo }/git/trees/master`)

const setData = (key, value)=> {
  const data = JSON.stringify(value)
  localStorage.setItem(key, data)
}

const getData = (key)=> {
  try {
    const x = localStorage.getItem(key)
    return JSON.parse(x)
  } catch (error) {
    console.log(error) 
    return null
  }
}

const langKey = "langs"

const getLocalLang = ()=> {
  const data = getData(langKey)
  return data
}

const setLocalLang = (value)=> {
  setData(langKey, value)
}

;(function() {
  window.vue = new Vue({
    el: "#app",
    data: {
      title: "Anime-Girls-Holding-Programming-Books",
      // the all lang
      langs: [],
      currLangPic: [],
      curr: null
    },
    watch: {
      curr(newVal) {
        this.getLangData(newVal)
      }
    },
    methods: {
      /**
       * get branch trees
       */
      async getTrees() {
        const data = getLocalLang()
        if (data) {
          this.langs = data
          return
        }
        try {
          const res = await axios.get(gitTree)
          let langs = res.data.tree
          const resultLang = langs.filter(item=> {
            const path = item.path
            // ignore the format file
            const isCSharp = path.indexOf("C#") >= 0
            const isMarkdown = path.lastIndexOf(".md") >= 0
            const isHTML = path.lastIndexOf(".html") >= 0
            const isJS = path.lastIndexOf(".js") >= 0
            return (!isMarkdown && !isHTML && !isJS && !isCSharp)
          })
          this.langs = resultLang
          setLocalLang(resultLang)
        } catch (error) {
          throw new Error(error)
        }
      },
      async getLangData(lang) {
        try {
          const now = this.langs.find(item=> item.path == lang)
          const { url } = now
          const res = await axios.get(url)
          const data = res.data
          const { tree } = data
          const pics = tree.filter(item=> {
            const formats = [ ".jpg", ".png" ]
            for (let index = 0; index < formats.length; index++) {
              const element = formats[index];
              const path = item.path
              const flag = path.lastIndexOf(element)
              if (flag) return true
            }
          })
          const R = pics.map(item=> {
            let path = item.path
            // if (lang == 'C#') {
            //   lang = "C%23"
            //   path = path.replace("C#", "C%23")
            // }
            const full = toCDNLink({
              username,
              repo,
              path: `${ lang }/${ path }`
            })
            // console.log('full: ', full)
            item['full'] = full
            return item
          })
          this.currLangPic = R
        } catch (error) {
          throw new Error(error)
        }
      }
    },
    async created() {
      await this.getTrees()
      const firstLang = this.langs[0].path
      this.curr = firstLang
      this.getLangData(firstLang)
    }
  })
})()