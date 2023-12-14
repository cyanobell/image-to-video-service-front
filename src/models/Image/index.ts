// RecoilのAtomを作成
import { atom, SetterOrUpdater, useRecoilState } from "recoil"

type Image = {
  id: number
  file: File
  element: HTMLImageElement
  width: number
  height: number
  url: string
}

// 画像データ用のRecoil State（Atom）
const imageListState = atom<Image[]>({
  key: 'imageListState',
  default: [],
});

type Function = (...args: any) => any

export const useImage = (): [Image[], Function] => {
  const [images, setImages] = useRecoilState(imageListState);

  const addImages = (files: File[]) => {
    files.forEach(file => {
      const url = URL.createObjectURL(file)
      const img = new window.Image()
      img.onload = () => {
        setImages((prevImages) => [...prevImages, {
          id: images.length,
          file: file,
          element: img,
          width: img.width,
          height: img.height,
          url: url,
        }])
        //URL.revokeObjectURL(url); // メモリリークを防ぐ
      }
      img.src = url
    })
  }
  return [images, addImages]
}
