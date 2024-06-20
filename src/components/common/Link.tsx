import * as Headless from '@headlessui/react'
// import NextLink, { type LinkProps } from 'next/link'
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
