import React from 'react'
import { Flex, Box } from '@grid'
import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'

import DetailPageHeader from '@components/_common/DetailPageHeader'
import SongList from '@common/SongList'

import { useRouter } from 'next/router'
import { Fetch } from '@lib/api'

import * as Alabum from '@features/album/services'

function AlbumDetailPage({ data }) {
  const { token } = useMember()
  const id = useRouter().query.id

  if (token === null) {
    return null
  }

  return (
    <Fetch
      service={() =>
        Alabum.getAlbumById(id, { token: token, page: 'alabumDetail' })
      }>
      {({ data }) => {
        console.log(data)
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
}

export default withPage()(AlbumDetailPage)
