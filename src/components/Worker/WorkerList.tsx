import { Fragment, ReactNode, useState } from 'react';
import { WorkerListToggle } from './WorkerListToggle';
import { Worker, WorkerView } from './WorkerView';

export function WorkerList({ data }: { data: Worker[] }) {
  // const workerListRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WorkerListToggle data={data} isToggledOn={isOpen} onToggle={setIsOpen} />

      <CollapsibleSection isOpen={isOpen}>
        <div className='flex gap-4 overflow-auto p-4'>
          {data.map((worker, i) => (
            <Fragment key={i}>
              <WorkerView data={worker} />
            </Fragment>
          ))}
        </div>
      </CollapsibleSection>
    </>
  );
}

function CollapsibleSection({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {isOpen && (
        <div className='absolute bottom-7 w-full rotate-180 '>
          <div className='rotate-180'>{children}</div>
        </div>
      )}
    </>
  );
}
