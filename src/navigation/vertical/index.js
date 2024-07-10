// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';



const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'mantenimiento'
    },
    {
      title: 'Despacho',
      icon: FactCheckOutlined,
      path: '/dispatch'
    },
    {
      title: 'Equipos',
      icon: LocalShippingOutlined,
      children: [
        {
          title: 'Vehículos',
          path: '/vehicles'
        },
        // {
        //   title: 'Modelos',
        //   path: '/vehicles-models'
        // }
      ]
    },
    {
      title: 'Conductores',
      icon: EngineeringIcon,
      path: '/drivers'
    },
  ]
}

export default navigation