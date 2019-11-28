import React, { useEffect } from 'react'
import { Flex } from '@grid'
import SongListItem from './SongListItem'
import { inject } from '@lib/store'

export default inject('playerStore')(SongList)

function SongList({ tracks, playerStore }) {
  useEffect(() => {
    playerStore.initQueue(tracks)
    console.log('Attch')
  }, [])

  return (
    <Flex
      flexWrap="wrap"
      width={1}
      css={{ padding: '10px 0', borderRadius: '5px' }}>
      {tracks.map((track, i) => (
        <SongListItem key={i} track={track} />
      ))}
    </Flex>
  )
}
