import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./constants/index";
import { PrivateRoute, WrapperApp, WrapperOuter, WrapperPages } from "./components";
import { CreateItem, CreatorDashboard, Market, MyAssets } from "./pages";
import Header from "./components/layout/Header";

export const MarketRoutes = (): JSX.Element => (
  <WrapperApp>
    <WrapperOuter>
      <WrapperPages>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Market />} />
            <Route path={APP_ROUTES.MARKET} element={<Market />} />
            {/* can be moved to private routes */}
            <Route path={APP_ROUTES.CREATE_ITEM} element={<CreateItem />} />
            <Route path={APP_ROUTES.CREATOR_DASHBOARD} element={<CreatorDashboard />} />
            <Route path={APP_ROUTES.MY_ASSETS} element={<MyAssets />} />
            <Route element={<PrivateRoute />}>
              <Route path={APP_ROUTES.USERS} element={<Market />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WrapperPages>
    </WrapperOuter>
  </WrapperApp>
);
