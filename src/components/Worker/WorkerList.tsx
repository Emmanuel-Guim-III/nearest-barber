import { Fragment, ReactNode, useState } from 'react';
import { WorkerListToggle } from './WorkerListToggle';
import { Worker, WorkerView } from './WorkerView';

export function WorkerList({ data }: { data: Worker[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WorkerListToggle
        data={data}
        isToggledOn={isOpen}
        onToggle={() => setIsOpen((prevState) => !prevState)}
      />

      <CollapsibleSection isOpen={isOpen}>
        <div
          style={{
            WebkitOverflowScrolling: 'touch',
            overflowY: 'auto',
          }}
        >
          <div className='flex w-full min-w-fit justify-center gap-2 p-2'>
            {data.map((worker, i) => (
              <Fragment key={i}>
                <WorkerView data={worker} />
              </Fragment>
            ))}
          </div>
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
        <div className='absolute bottom-7 w-full rotate-180'>
          <div className='rotate-180'>{children}</div>
        </div>
      )}
    </>
  );
}
