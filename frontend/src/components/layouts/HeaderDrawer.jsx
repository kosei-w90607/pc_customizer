import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

const HeaderDrawer = ({ open, handleDrawerToggle, drawerItem }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleDrawerToggle}
    >
      <Box
        sx={{
          width: drawerWidth,
          backgroundColor: '#38D1EC',
          height: '100%',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="presentation"
      >
        {/* ドロワーのヘッダー部分 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 1,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>
            メニュー
          </Typography>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: 'white' }}
            aria-label="メニューを閉じる"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* ナビゲーションリスト */}
        <List sx={{ flexGrow: 1 }}>
          {drawerItem.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={item.onClick ? item.onClick : handleDrawerToggle}
                sx={{ color: 'white' }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default HeaderDrawer;
