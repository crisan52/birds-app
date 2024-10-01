import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { Bird } from '@/types/bird'
import { MoreHorizontal } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { deleteBird } from './actions'
import { useRouter } from 'next/navigation'

const BirdComponent = ({
  bird,
  refetch,
}: {
  bird: Bird
  refetch: Dispatch<SetStateAction<void>>
}) => {
  const router = useRouter()
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">{bird.id}</TableCell>
      <TableCell className="font-medium">{bird.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {bird.category}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/birds/${bird.id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await deleteBird(bird.id)
                refetch()
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default BirdComponent
