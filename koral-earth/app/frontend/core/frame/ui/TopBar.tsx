import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useCelo } from '@celo/react-celo';
import Link from 'next/link';
import { Route } from '../../../shared/routes';
import { useEffect, useState } from 'react';

export const TopBar = () => {
  const { account, connect } = useCelo();
  const [address, setAddress] = useState<string | null | undefined>(null);

  useEffect(() => {
    setAddress(account);
  }, [account]);

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link href={Route.home}>
            <a style={{ textDecoration: 'none', color: 'white' }}>
              Koral Earth
            </a>
          </Link>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Navbar.Text className="me-3">
            <Link href={Route.userRewards}>
              <a style={{ textDecoration: 'none' }}>My Rewards</a>
            </Link>
          </Navbar.Text>

          {!address && (
            <Button onClick={() => connect().catch(console.log)}>
              Connect
            </Button>
          )}
          {address && (
            <Navbar.Text>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Popover id="overlay-account" className="p-3">
                    {account}
                  </Popover>
                }
              >
                <Badge bg="light" text="dark">
                  Connected &#10003;
                </Badge>
              </OverlayTrigger>
            </Navbar.Text>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
