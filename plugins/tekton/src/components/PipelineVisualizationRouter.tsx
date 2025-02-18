import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';

import { TEKTON_CI_ANNOTATION } from '../consts/tekton-const';
import { PipelineRunVisualization } from './pipeline-topology';

/** @public */
export const isTektonCIAvailable = (entity: Entity): boolean =>
  Boolean(entity.metadata.annotations?.[TEKTON_CI_ANNOTATION]);

type PipelineVisualizationRouterProps = {
  linkTekton?: boolean;
  url?: string;
};

/** @public */
export const PipelineVisualizationRouter = ({
  linkTekton,
  url,
}: PipelineVisualizationRouterProps) => {
  const { entity } = useEntity();
  if (isTektonCIAvailable(entity)) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <PipelineRunVisualization linkTekton={linkTekton} url={url} />
          }
        />
      </Routes>
    );
  }
  return null;
};
