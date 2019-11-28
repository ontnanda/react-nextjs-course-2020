import React from 'react'
import { Flex, Box } from '@grid'
import Button from '@common/Button'
import colors from '@features/_ui/colors'
import { inject } from '@lib/store'

export default inject('playerStore')(DetailPageHeader)

function DetailPageHeader({ data, playerStore }) {
  return (
    <Flex flexWrap="wrap" css={{ padding: '20px 70px' }}>
      <Box width={1}>
        <img src={data.image} />
        <div css={{ textAlign: 'center' }}>
          <h1
            css={{
              color: colors.link,
              fontSize: '1.6em',
              fontWeight: 'bold',
              lineHeight: 1.5,
              padding: '8px 0 10px',
            }}>
            {data.title}
          </h1>
          <p css={{ padding: '0 0 40px', fontSize: '0.8em' }}>
            {data.subTitle}
          </p>
          <p>
            <Button
              css={{
                display: playerStore.playState.queue.length > 0 ? '' : 'none',
              }}
              onClick={e => {
                // if (playerStore.nowPlaying.id !== '') return
                console.log(playerStore.playState.currentPlaying, '<==')
                let track =
                  playerStore.playState.queue[
                    playerStore.playState.currentPlaying
                  ]
                track.playing = true
                playerStore.play(track)
              }}>
              Play
            </Button>
          </p>
          <p css={{ paddingTop: '15px', fontSize: '0.7em' }}>
            {data.bottomLine}
          </p>
        </div>
      </Box>
    </Flex>
  )
}
