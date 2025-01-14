import { PropsWithChildren } from 'react';
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { Project } from '../../../backend/market/market.entity';
import classNames from 'classnames';
import {
  PaginatedItemsComponent,
  PaginatedLayout,
} from '../../core/paginator/PaginatedLayout';
import { rowsFromData } from '../../lib/array';
import Link from 'next/link';
import { getProjectUrlByRegistry } from '../../../backend/registry/registry.repo';
import { Route } from '../../shared/routes';

const Projects: PaginatedItemsComponent<Project> = ({ currentItems }) => (
  <>
    {rowsFromData(currentItems).map((eachRow, rowIndex) => (
      <Row key={rowIndex}>
        {eachRow.map((project, index) => {
          if (!project.projectId || !project.standard) {
            return null;
          }

          return (
            <Col
              md="3"
              key={index}
              className={classNames('mb-5', { 'pr-3': rowIndex + 1 !== index })}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://via.placeholder.com/200?text="Project ID: ${project.methodology}"`}
                />
                <Card.Body>
                  <Card.Title>
                    <Link
                      passHref
                      href={getProjectUrlByRegistry(
                        project.projectId,
                        project.standard
                      )}
                    >
                      <a target="_blank">Full info here</a>
                    </Link>
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Region: {project.region}</ListGroup.Item>
                  <ListGroup.Item>
                    Methodology: {project.methodology}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Row className="m-2">
                <Link href={Route.offset({ projectId: project.projectId })}>
                  <Button variant="primary">Offset through project</Button>
                </Link>
              </Row>
            </Col>
          );
        })}
      </Row>
    ))}
  </>
);

type MarketProps = PropsWithChildren<{
  projects: Project[];
}>;

export const Market = ({ projects }: MarketProps) => {
  return (
    <>
      <h3 className="mb-4">Toucan Carbon Credit Projects</h3>
      <PaginatedLayout
        items={projects}
        itemsPerPage={12}
        itemsComponent={Projects}
      />
    </>
  );
};
