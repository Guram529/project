import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <>
      <h2 className="NotfoundTxt">
      The page you entered could not be found
      </h2>
      <span className="Back">
        Go back{" "}
        <Button asChild variant="link" >
          <Link className="Home" to="/">Home</Link>
        </Button>{" "}
      </span>
    </>
  )
}
