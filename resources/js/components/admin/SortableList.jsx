import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Bars3Icon } from '@heroicons/react/24/outline'

function SortableRow({ id, index, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform:  CSS.Transform.toString(transform),
        transition,
        opacity:    isDragging ? 0.5 : 1,
        zIndex:     isDragging ? 50 : 'auto',
      }}
      className="flex items-center gap-2 group"
    >
      {/* SL number */}
      <span className="w-7 text-center text-xs font-medium text-gray-400 tabular-nums flex-shrink-0 select-none">
        {index + 1}
      </span>

      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="p-1.5 rounded-lg text-dark-300 hover:text-dark hover:bg-light-100
                   cursor-grab active:cursor-grabbing flex-shrink-0
                   opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        title="Drag to reorder"
      >
        <Bars3Icon className="w-4 h-4" />
      </button>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

/**
 * items must each have a unique `id` field.
 * renderItem(item) → ReactNode
 * onReorder(newItems) → called when order changes
 */
export default function SortableList({ items = [], onReorder, renderItem }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((item) => item.id === active.id)
    const newIndex = items.findIndex((item) => item.id === over.id)
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <SortableRow key={item.id} id={item.id} index={index}>
              {renderItem(item)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
