'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

export const SeedShopsProductsButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)

  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (seeded || loading) return
    setLoading(true)
    try {
      toast.promise(
        fetch('/next/seed-shops-products', { method: 'POST', credentials: 'include' }).then((res) => {
          if (!res.ok) throw new Error('Seeding failed')
          setSeeded(true)
        }),
        {
          loading: 'Seeding shops and products...',
          success: 'Shops and products seeded! You can now assign products to shops.',
          error: 'Error seeding shops and products.',
        },
      )
    } finally {
      setLoading(false)
    }
  }, [loading, seeded])

  return (
    <Fragment>
      <button
        type="button"
        className="seedButton"
        onClick={handleClick}
        disabled={loading || seeded}
        style={{ marginLeft: 8 }}
      >
        {seeded ? 'Shops & products seeded' : 'Seed shops & products'}
      </button>
    </Fragment>
  )
}
