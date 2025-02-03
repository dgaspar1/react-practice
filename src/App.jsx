import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarComponent from './components/Sidebar';
import CardApps from './components/Card';
import Header from './components/Header'; // Importação do Header
import Management from './modules/management'; // Importa a página de management
import UserManagement from './modules/management/user-management'; // Importa o módulo de user-management
import UserForm from './modules/management/user-management/form';

// Importando os componentes de cada app
import Schedule from './modules/schedule';
import MaintenanceEquipments from './modules/maintenence/equipament';
import MaintenanceOrder from './modules/maintenence/order';
import MaintenanceScript from './modules/maintenence/script';
import MaintenanceHistory from './modules/maintenence/history';
import FinancialFlow from './modules/financial/flow';
import FinancialPayment from './modules/financial/payment';
import FinancialReceive from './modules/financial/receive';
import Procurement from './modules/procurement';
import ProcurementContract from './modules/procurement/contract';
import ProcurementCostCenter from './modules/procurement/cost-center';
import ProcurementProduct from './modules/procurement/product';
import ProcurementProductForm from './modules/procurement/product/product-form';
import ProcurementService from './modules/procurement/service';
import ProcurementSupplier from './modules/procurement/supplier';
import ProcurementSupplierForm from './modules/procurement/supplier/supplier-form';

import SalesOrder from './modules/sales/order';
import SalesProposal from './modules/sales/proposal';
import SalesTrack from './modules/sales/track';

import { styled } from '@mui/system';

const AppContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column', // Organiza o layout verticalmente
    width: '100%',
    fontFamily: '"Roboto", sans-serif',
});

const MainContentWrapper = styled('div')({
    display: 'flex',
    width: '100%',
    paddingTop: '30px',
    flexGrow: 1, // Permite que ocupe o espaço restante abaixo do Header
});

const MainContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    padding: 20,
    fontFamily: '"Roboto", sans-serif',
});

const App = () => {
    return (
        <Router>
            <AppContainer>
                {/* Instanciando o Header */}
                <Header user="denys.gaspar@itjucas.com.br" />

                {/* Wrapper para organizar Sidebar e Conteúdo Principal */}
                <MainContentWrapper>
                    <SidebarComponent />
                    <MainContent>

                        <Routes>
                            {/* Página inicial */}
                            <Route path="/" element={<CardApps title="Página inicial" />} />

                            {/* Management */}
                            <Route path="/management" element={<Management />} />
                            <Route path="/management/user" element={<UserManagement />} />
                            <Route path="/management/user/form" element={<UserForm />} />


                            {/* Procurement */}
                            <Route path="/procurement" element={<Procurement />} />
                            <Route path="/procurement/contract" element={<ProcurementContract />} />
                            <Route path="/procurement/cost-center" element={<ProcurementCostCenter />} />
                            <Route path="/procurement/product" element={<ProcurementProduct />} />
                            <Route path="/procurement/product/form" element={<ProcurementProductForm />} />
                            <Route path="/procurement/service" element={<ProcurementService />} />
                            <Route path="/procurement/supplier" element={<ProcurementSupplier />} />
                            <Route path="/procurement/supplier/form/:id" element={<ProcurementSupplierForm />} />

                            {/* Schedule */}
                            <Route path="/schedule" element={<Schedule />} />

                            {/* Maintenance */}
                            <Route path="/maintenance/equipments" element={<MaintenanceEquipments />} />
                            <Route path="/maintenance/order" element={<MaintenanceOrder />} />
                            <Route path="/maintenance/script" element={<MaintenanceScript />} />
                            <Route path="/maintenance/history" element={<MaintenanceHistory />} />

                            {/* Financial */}
                            <Route path="/financial/flow" element={<FinancialFlow />} />
                            <Route path="/financial/payment" element={<FinancialPayment />} />
                            <Route path="/financial/receive" element={<FinancialReceive />} />


                            {/* Sales */}
                            <Route path="/sales/order" element={<SalesOrder />} />
                            <Route path="/sales/proposal" element={<SalesProposal />} />
                            <Route path="/sales/track" element={<SalesTrack />} />
                        </Routes>
                    </MainContent>
                </MainContentWrapper>
            </AppContainer>
        </Router>
    );
};

export default App;
