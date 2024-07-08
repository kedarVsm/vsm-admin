import path from 'path'
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateAbout } from './hooks/populateAbout'

export const About: CollectionConfig = {
  slug: 'Abouts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description'],
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
    crop: true,
    focalPoint: true,
  },
  access: {
    read: () => true,
    update: admins,
    create: admins,
    delete: admins,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [populateAbout],
    afterRead: [populateArchiveBlock],
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'alt', type: 'text', required: true },
    { name: 'updatedAt', type: 'date', required: true },
    { name: 'publishedAt', type: 'date', required: true },
    slugField(),
  ],
}
