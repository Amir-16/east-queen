/**
 * Convert a string to a URL-safe slug.
 * Handles Arabic / Unicode by stripping non-ASCII after lowercasing.
 */
export function toSlug(str = '') {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')   // strip non-word chars
        .replace(/[\s_]+/g, '-')    // spaces/underscores → hyphen
        .replace(/-+/g, '-')        // collapse consecutive hyphens
        .replace(/^-|-$/g, '');     // strip leading/trailing hyphens
}

/**
 * Truncate a string to `max` characters, appending "…" if needed.
 */
export function truncate(str = '', max = 80) {
    return str.length <= max ? str : str.slice(0, max - 1) + '…';
}
