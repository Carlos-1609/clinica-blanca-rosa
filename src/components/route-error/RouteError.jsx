import { useRouteError } from "react-router-dom";

export default function RouteError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="font-mono font-bold text-center text-xl">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
