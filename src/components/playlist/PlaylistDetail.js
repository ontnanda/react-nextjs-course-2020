import React from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'

import DetailPageHeader from '@components/_common/DetailPageHeader'
import SongList from '@common/SongList'

import * as Alabum from '@features/playlist/services'
import { Fetch } from '@lib/api'
import { useRouter } from 'next/router'

function PlaylistDetailPage() {
  const { token } = useMember()

  if (token === null) {
    return null
  }
  const id = useRouter()
  return (
    <Fetch service={() => Alabum.getPlaylistById(id.query.id, { token })}>
      {({ data }) => {
        return (
          <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
            <Box width={1 / 3}>
              <DetailPageHeader data={data} />
            </Box>
            <Box width={2 / 3}>
              <SongList tracks={data.tracks} />
            </Box>
          </Flex>
        )
      }}
    </Fetch>
  )
  // return
}

export default withPage({ restricted: true })(PlaylistDetailPage)
