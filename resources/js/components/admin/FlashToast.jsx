import { useEffect } from 'react'
import { usePage, router } from '@inertiajs/react'
import { toast } from 'sonner'

export default function FlashToast() {
    // Inertia v2 native flash event — fires after every navigation/redirect,
    // including hard reloads caused by 409 version conflicts.
    useEffect(() => {
        return router.on('flash', (event) => {
            const { flash } = event.detail
            if (flash?.success) toast.success(flash.success, { duration: 4000 })
            if (flash?.error)   toast.error(flash.error,   { duration: 5000 })
        })
    }, [])

    // Validation errors from failed form submissions (stay on same page with errors prop)
    const { errors } = usePage().props
    const errorsKey = Object.keys(errors ?? {}).sort().join('|')
    useEffect(() => {
        if (!errorsKey) return
        const values = Object.values(errors)
        const message = values.length === 1
            ? values[0]
            : `Please fix ${values.length} validation errors.`
        toast.error(message, { id: 'validation', duration: 5000 })
    }, [errorsKey])

    return null
}
