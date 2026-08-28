import { format, parseISO } from 'date-fns'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const count = payload[0].value
  return (
    <div className="bg-dark text-white text-xs font-body rounded-lg px-3 py-2 shadow-admin">
      <p className="font-semibold mb-0.5">{label}</p>
      <p className="text-admin-gold">
        {count} {count === 1 ? 'inquiry' : 'inquiries'}
      </p>
    </div>
  )
}

export default function InquiryChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-44 text-sm font-body text-dark-300">
        No inquiry data for the last 30 days.
      </div>
    )
  }

  const rows = data.map((d) => ({
    ...d,
    label: format(parseISO(d.date), 'MMM d'),
  }))

  const maxVal = Math.max(...rows.map((d) => d.total), 1)

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={rows} barSize={10} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: '#475569', fontFamily: 'Inter, sans-serif' }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          allowDecimals={false}
          domain={[0, Math.ceil(maxVal * 1.25)]}
          tick={{ fontSize: 10, fill: '#475569', fontFamily: 'Inter, sans-serif' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9', radius: 4 }} />
        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
          {rows.map((_, i) => (
            <Cell
              key={i}
              fill={i === rows.length - 1 ? '#C9A84C' : '#1B4F8A'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
