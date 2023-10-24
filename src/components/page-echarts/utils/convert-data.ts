import type { IEchartValueType } from '../types'
import { coordinateData } from './coordinate-data'

/**
 *  将服务器获取的数据和coordinateData中的key进行比较，匹配成功时对服务器数据的value修改至需要格式[经度，纬度，值]
 * @param data 从服务器获取的数据
 * @returns 格式化后数据的数组
 */
export function convertData(data: IEchartValueType[]) {
  const convertArr: IEchartValueType[] = []
  for (let i = 0; i < data.length; i++) {
    const geoName = coordinateData[data[i].name]
    if (geoName) {
      convertArr.push({
        name: data[i].name,
        value: geoName.concat(data[i].value)
      })
    }
  }
  return convertArr
}
