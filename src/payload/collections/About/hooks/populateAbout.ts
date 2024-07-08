import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { revalidate } from '../../../utilities/revalidate'

export const populateAbout: AfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc._status === 'published') {
    revalidate({
      payload,
      collection: 'About',
      slug: doc.titles,
    })
  }

  return doc
}
