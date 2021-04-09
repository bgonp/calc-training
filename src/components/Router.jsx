import { Route } from 'wouter'

import Calc from 'components/pages/Calc'
import Stats from 'components/pages/Stats'
import { ROUTES } from 'constants/routes'

const Router = () => (
  <>
    <Route path={ROUTES.STATS}><Stats /></Route>
    <Route path={ROUTES.CALC}><Calc /></Route>
  </>
)

export default Router
