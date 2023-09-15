export interface ServerErrorProps {
  message?: string;
}

export default function Error(props: ServerErrorProps) {
  return (
    <div className="bg-red-800 text-white rounded-xl p-3 my-6">
      {props.message || 'A server error occurs!'}
    </div>
  );
}
