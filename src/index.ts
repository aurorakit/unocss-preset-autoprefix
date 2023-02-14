import { CSSEntries, Preset, UtilObject } from '@unocss/core'
import browserslist from 'browserslist'
import { transformStyleAttribute, browserslistToTargets } from 'lightningcss'

export function autoPrefixPreset(): Preset {
  return {
    name: 'unocss-preset-autoprefix',
    postprocess: (util: UtilObject) => {
      const { code } = transformStyleAttribute({
        code: Buffer.from(util.entries.map((item) => item.join(':')).join(';')),
        targets: browserslistToTargets(browserslist(['>=0.05%'])),
      })
      util.entries = code
        .toString()
        .split(';')
        .map((item) => item.split(':')) as CSSEntries
    },
  }
}
