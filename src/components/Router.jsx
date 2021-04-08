import { Route } from 'wouter'

import Main from 'components/Main'
import Stats from 'components/Stats'
import { ROUTES } from 'constants/routes'

const Router = () => (
  <>
    <Route path={ROUTES.STATS}><Stats /></Route>
    <Route path={ROUTES.MAIN}><Main /></Route>
  </>
)

export default Router
