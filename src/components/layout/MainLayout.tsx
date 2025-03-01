import React, { ReactNode } from 'react';
import AppHeader from './AppHeader';
import SideNavigation from './SideNavigation';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-main text-text-primary">
      <div className="flex flex-col h-full">
        <AppHeader />
        <div className="flex flex-row flex-1 overflow-hidden">
          <div className="w-full md:w-1/4 lg:w-1/6 hidden md:block">
            <SideNavigation />
          </div>
          <main className="flex-1 p-3 overflow-auto w-full md:w-3/4 lg:w-5/6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 