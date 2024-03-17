import {
  Children,
  FC,
  MouseEventHandler,
  ReactNode, useState
} from "react"
import "./styles.css"

const Card: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="border bg-white rounded-md h-[300px] min-w-[320px]">
      {children}
    </div>
  )
}

const TaskBarCard: FC<{
  children: ReactNode
  id: number
}> = ({ children, id }) => {
  return <div className="flex-1 snap-center snap-normal bg-white min-w-[80%]" id={`${id}`}>{children}</div>
}

const TaskBar: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentId, setCurrentId] = useState<number | null>(null)
  const kids = Children.toArray(children)

  const handleScroll: MouseEventHandler<HTMLDivElement> = (e) => {
    const { scrollWidth, scrollLeft, clientWidth } = e.currentTarget
    const range = scrollWidth - clientWidth
    const period = range / kids.length
    const position = Math.ceil(scrollLeft / period) || 1
    const index = position - 1
    setCurrentId(index)
  }

  return (
    <div>
      <div
        onScroll={handleScroll}
        className=" bg-red-300 scroll-smooth overflow-x-autosnap-x snap-mandatory snap-x overflow-x-scroll"
      >
        <div className="flex gap-4">
          {kids.map((card, index) => (
            <TaskBarCard key={index} id={index}>
              {card}
            </TaskBarCard>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {kids.map((_, index) => {
          return (
            <a
              key={index}
              href={`#${index}`}
              className={`size-8 border-2 rounded-full ${
                index === currentId ? "bg-slate-700" : ""
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

function App() {
  return (
    <main className="">
      <TaskBar>
        <Card>CArd 1</Card>
        <Card>CArd 2</Card>
        <Card>CArd 3</Card>
        <Card>CArd 4</Card>
        <div>Almost anything</div>
      </TaskBar>
    </main>
  )
}

export default App
