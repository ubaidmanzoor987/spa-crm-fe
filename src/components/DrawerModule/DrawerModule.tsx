import * as React from 'react';
import { memo, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, Grid, IconButton, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import { HoverTypo, DivServices, StyledSwipeableDrawer, Line, LineDiv } from './DrawerModule.styles';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
type Props = {
  togglestate: boolean;
  setToggleState: any;
  onClose: () => void;
};

function DrawerModule(props: Props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    onclose: false,
  });
  const { setToggleState, togglestate } = props;

  const anchorVal = 'right';

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    if (open === false) {
      setToggleState(false);
    }
    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    toggleDrawer(anchorVal, togglestate)({} as React.KeyboardEvent | React.MouseEvent);
  }, [togglestate]);

  const navList = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'About',
      link: '/about',
    },
    {
      title: 'Services',
      link: '/services',
    },
    {
      title: 'Team',
      link: '/teams',
    },
    {
      title: 'Event',
      link: '/events',
    },
    {
      title: 'Portfolio',
      link: '/portfolio',
    },
    {
      title: 'Contact',
      link: '/contact',
    },
  ];

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: '#4281EE', color: 'white', height: '100vh' }}
    >
      <DialogTitle id="id" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Grid display="flex" alignItems="center">
          <Box flexGrow={2}></Box>
          <Box>
            <IconButton onClick={toggleDrawer(anchor, false)}>
              <CloseIcon style={{ backgroundColor: 'transparent', color: 'white', marginTop: '5px' }} />
            </IconButton>
          </Box>
        </Grid>
      </DialogTitle>

      <DivServices>
        <List>
          {navList.map((navList) => {
            return (
              <>
                <Link href={navList.link} style={{ textDecoration: 'none' }} key={navList.title}>
                  <HoverTypo>{navList.title}</HoverTypo>
                </Link>
                <LineDiv>
                  <Line />
                </LineDiv>
              </>
            );
          })}
        </List>
      </DivServices>
    </Box>
  );

  return (
    <div>
      {([anchorVal] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <StyledSwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </StyledSwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default memo(DrawerModule);
