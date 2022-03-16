import React, { FC, ReactElement } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Bond, Dashboard, NotFound, Stake, Mints } from '@view/index';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import CommonRoute from '@view/router/components/common-route';

export const Router: FC = (): ReactElement => {
  const { bonds } = useBonds();
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CommonRoute Component={Dashboard} />} />
        <Route path="/dashboard" element={<CommonRoute Component={Dashboard} />} />
        <Route path="stake" element={<CommonRoute Component={Stake} />} />
        <Route path=":side/mints" element={<CommonRoute Component={Mints} />}>
          <>
            {bonds.map((bond: IAllBondData): ReactElement => {
              return (
                <Route
                  key={bond.name}
                  path={`${bond.name}`}
                  element={<Bond bond={bond} />}
                />
              );
            })}
          </>
        </Route>
        <Route path="*" element={<CommonRoute Component={NotFound}/>} />
      </Routes>
    </HashRouter>
  );
};