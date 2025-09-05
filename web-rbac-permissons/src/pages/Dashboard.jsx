import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import { API_ROOT, TAB_URLS } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis'
import cover from '~/assets/11721400.jpg'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { usePermission } from '~/hooks/usePermission'
import { permissions } from '~/config/rbacConfig'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { hasPermission } = usePermission(user?.role)


  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`)
      setUser(res.data)
    }
    fetchData()
  }, [])


  const handleLogout = async () => {
    await handleLogoutAPI()
    navigate('/login')
  }

  const getDefaultActiveTab = () => {
    let activeTab = TAB_URLS.DASHBOARD
    Object.values(TAB_URLS).forEach(tab => {
      if (location.pathname.includes(tab)) activeTab = tab
    })
    return activeTab
  }

  const [tab, setTab] = useState(getDefaultActiveTab())

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 1em',
      gap: 2
    }}>
      <Box
        component="img"
        sx={{ width: '100%', height: '180px', borderRadius: '6px', objectFit: 'cover' }}
        src={cover}
        alt='cover'
      >
      </Box>

      <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' }, width: { md: 'max-content' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.email}</Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      <Alert severity="success" variant="outlined" sx={{ '.MuiAlert-message': { overflow: 'hidden' }, width: { md: 'max-content' } }}>
        Role hiện tại của User đăng nhập là:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.role}</Typography>
      </Alert>

      {/**khu vực phân quyền truy cập. Sử dụng Mui tabs */}
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            { hasPermission(permissions.VIEW_DASHBOARD) &&
              <Tab label="Dashboard" value={TAB_URLS.DASHBOARD} component={Link} to={'/dashboard'} />
            }
            { hasPermission(permissions.VIEW_SUPPORT) &&
              <Tab label="Support" value={TAB_URLS.SUPPORT} component={Link} to={'/support'} />
            }
            { hasPermission(permissions.VIEW_MESSAGES) &&
              <Tab label="Messages" value={TAB_URLS.MESSAGES} component={Link} to={'/messages'} />
            }
            { hasPermission(permissions.VIEW_REVENUE) &&
              <Tab label="Revenue" value={TAB_URLS.REVENUE} component={Link} to={'/revenue'} />
            }
            { hasPermission(permissions.VIEW_ADMIN_TOOLS) &&
              <Tab label="Admin tools" value={TAB_URLS.ADMIN_TOOLS} component={Link} to={'/admin-tools'} />
            }
          </TabList>
        </Box>
        { hasPermission(permissions.VIEW_DASHBOARD) &&
        <TabPanel value={TAB_URLS.DASHBOARD}>
          <Alert severity="success" sx={{ width: 'max-content' }}>
            Nội dung trang Dashboard chung cho tất cả các Roles!
          </Alert>
        </TabPanel>
        }

        { hasPermission(permissions.VIEW_SUPPORT) &&
        <TabPanel value={TAB_URLS.SUPPORT}>
          <Alert severity="success" sx={{ width: 'max-content' }}>
            Nội dung trang Support!
          </Alert>
        </TabPanel>
        }

        { hasPermission(permissions.VIEW_MESSAGES) &&
        <TabPanel value={TAB_URLS.MESSAGES}>
          <Alert severity="info" sx={{ width: 'max-content' }}>
            Nội dung trang Messages!
          </Alert>
        </TabPanel>
        }

        { hasPermission(permissions.VIEW_REVENUE) &&
        <TabPanel value={TAB_URLS.REVENUE}>
          <Alert severity="warning" sx={{ width: 'max-content' }}>
            Nội dung trang Revenue!
          </Alert>
        </TabPanel>
        }

        { hasPermission(permissions.VIEW_ADMIN_TOOLS) &&
        <TabPanel value={TAB_URLS.ADMIN_TOOLS}>
          <Alert severity="error" sx={{ width: 'max-content' }}>
            Nội dung trang Admin tools!
          </Alert>
        </TabPanel>
        }
      </TabContext>
      <Divider />
      <Button
        type='button'
        variant='contained'
        color='info'
        size='large'
        sx={{ mt: 2, maxWidth: 'min-content', alignSelf: 'flex-end' }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  )
}

export default Dashboard
