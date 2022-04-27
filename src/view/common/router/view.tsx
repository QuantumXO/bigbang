import React, { FC, ReactElement } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Bond, Dashboard, NotFound, Stake, Mints, ReverseBonding } from '@view/index';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import CommonRoute from '@view/common/router/components/common-route';

export const Router: FC = (): ReactElement => {
  const { bonds } = useBonds();
  return (
    <HashRouter>
      <Routes>
        <Route index element={<CommonRoute Component={Dashboard} />} />
        <Route path="dashboard" element={<CommonRoute Component={Dashboard} />} />
        <Route path="stake" element={<CommonRoute Component={Stake} />} />
        <Route path="mints" element={<CommonRoute Component={Mints} />} />
        <Route path="reverse-bonding" element={<CommonRoute Component={ReverseBonding} />} />
        {bonds.map((bond: IAllBondData): ReactElement => {
          return (
            <Route
              key={bond.id}
              path={`mints/${bond.id}`}
              element={(
                <CommonRoute>
                  <Bond bond={bond} />
                </CommonRoute>
              )}
            />
          );
        })}
        <Route path="*" element={<CommonRoute Component={NotFound}/>} />
      </Routes>
    </HashRouter>
  );
};