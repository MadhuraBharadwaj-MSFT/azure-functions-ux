import React, { useState, useContext } from 'react';
import { Pivot, PivotItem, IPivotItemProps } from 'office-ui-fabric-react';
import DeploymentCenterFtps from '../DeploymentCenterFtps';
import { useTranslation } from 'react-i18next';
import { DeploymentCenterCodePivotProps } from '../DeploymentCenter.types';
import DeploymentCenterCodeLogs from './DeploymentCenterCodeLogs';
import DeploymentCenterCodeSettings from './DeploymentCenterCodeSettings';
import { DeploymentCenterContext } from '../DeploymentCenterContext';
import { ScmType, BuildProvider } from '../../../../models/site/config';
import CustomTabRenderer from '../../app-settings/Sections/CustomTabRenderer';
import { ThemeContext } from '../../../../ThemeContext';
import { DeploymentCenterPublishingContext } from '../DeploymentCenterPublishingContext';
import DeploymentCenterGitHubActionLogs from './DeploymentCenterGitHubActionLogs';

const DeploymentCenterCodePivot: React.FC<DeploymentCenterCodePivotProps> = props => {
  const { formProps, deployments, deploymentsError, isLoading } = props;
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = useState<string>('logs');

  const deploymentCenterContext = useContext(DeploymentCenterContext);
  const deploymentCenterPublishingContext = useContext(DeploymentCenterPublishingContext);
  const theme = useContext(ThemeContext);

  const isScmLocalGit = deploymentCenterContext.siteConfig && deploymentCenterContext.siteConfig.properties.scmType === ScmType.LocalGit;
  const isScmGithubActions =
    deploymentCenterContext.siteConfig && deploymentCenterContext.siteConfig.properties.scmType === ScmType.GitHubAction;

  const goToSettingsOnClick = () => {
    setSelectedKey('settings');
  };

  const onLinkClick = (item: PivotItem) => {
    if (item.props.itemKey) {
      setSelectedKey(item.props.itemKey);
    }
  };

  const isSettingsDirty = (): boolean => {
    return (
      formProps.values.buildProvider !== BuildProvider.None &&
      !!deploymentCenterContext.siteConfig &&
      deploymentCenterContext.siteConfig.properties.scmType === ScmType.None
    );
  };

  const isFtpsDirty = (): boolean => {
    const currentUser = deploymentCenterPublishingContext.publishingUser;
    return (
      !!currentUser &&
      ((currentUser.properties.publishingUserName && !formProps.values.publishingUsername) ||
        (!!formProps.values.publishingUsername && currentUser.properties.publishingUserName !== formProps.values.publishingUsername) ||
        (!!formProps.values.publishingPassword || !!formProps.values.publishingConfirmPassword))
    );
  };

  const getGitHubActionsAndKuduLogsComponent = () => {
    return (
      <Pivot selectedKey={selectedKey} onLinkClick={onLinkClick}>
        <PivotItem itemKey="app-service-logs" headerText={t('App Service Logs')} ariaLabel={t('deploymentCenterPivotItemLogsAriaLabel')}>
          {getKuduLogsComponent()}
        </PivotItem>

        <PivotItem itemKey="ga-logs" headerText={t('GitHub Actions Logs')} ariaLabel={t('deploymentCenterPivotItemLogsAriaLabel')}>
          <DeploymentCenterGitHubActionLogs />
        </PivotItem>
      </Pivot>
    );
  };

  const getKuduLogsComponent = () => {
    return (
      <DeploymentCenterCodeLogs
        goToSettings={goToSettingsOnClick}
        deployments={deployments}
        deploymentsError={deploymentsError}
        isLoading={isLoading}
      />
    );
  };

  return (
    <Pivot selectedKey={selectedKey} onLinkClick={onLinkClick}>
      <PivotItem
        itemKey="logs"
        headerText={t('deploymentCenterPivotItemLogsHeaderText')}
        ariaLabel={t('deploymentCenterPivotItemLogsAriaLabel')}>
        {isScmGithubActions ? getGitHubActionsAndKuduLogsComponent() : getKuduLogsComponent()}
      </PivotItem>

      <PivotItem
        itemKey="settings"
        headerText={t('deploymentCenterPivotItemSettingsHeaderText')}
        ariaLabel={t('deploymentCenterPivotItemSettingsAriaLabel')}
        onRenderItemLink={(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element) =>
          CustomTabRenderer(link, defaultRenderer, theme, isSettingsDirty, t('modifiedTag'))
        }>
        <DeploymentCenterCodeSettings formProps={formProps} />
      </PivotItem>

      <PivotItem
        itemKey="ftps"
        headerText={isScmLocalGit ? t('deploymentCenterPivotItemGitFtpsHeaderText') : t('deploymentCenterPivotItemFtpsHeaderText')}
        ariaLabel={isScmLocalGit ? t('deploymentCenterPivotItemGitFtpsAriaLabel') : t('deploymentCenterPivotItemFtpsAriaLabel')}
        onRenderItemLink={(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element) =>
          CustomTabRenderer(link, defaultRenderer, theme, isFtpsDirty, t('modifiedTag'))
        }>
        <DeploymentCenterFtps formProps={formProps} isLoading={isLoading} />
      </PivotItem>
    </Pivot>
  );
};

export default DeploymentCenterCodePivot;
