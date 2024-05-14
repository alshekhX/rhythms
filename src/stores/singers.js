import { defineStore } from 'pinia'
import { singersCollection, auth, songsCollection } from '@/includes/firebase.js'

export default defineStore('singers', {
  actions: {
    async addSinger(values) {
      const singerRef = await singersCollection.add({ ...values, uid: auth.currentUser.uid })
      const singerSnap = await singerRef.get()
      console.log(singerSnap)

      return singerSnap
    },

    async getSingerById(id) {
      const singer = await singersCollection.doc(id).get()

      console.log(singer.data())

      return singer.data()
    },

    async getSingerSongs(id) {
      const SongsSnap = await songsCollection.where('singerID', '==', id).get()
      const songs = []
      SongsSnap.forEach((song) => {
        songs.push({
          id: song.id,
          ...song.data()
        })
      })

      return songs
    }
  }
})
