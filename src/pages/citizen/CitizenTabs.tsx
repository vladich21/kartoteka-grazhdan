import { Tabs } from 'antd'
import type { AddressBlock, Citizen } from '../../types'
import { ContactsTab } from './tabs/ContactsTab'
import { DocsTab } from './tabs/DocsTab'
import { ExtraTab } from './tabs/ExtraTab'
import { MilitaryTab } from './tabs/MilitaryTab'
import { ProfileTab } from './tabs/ProfileTab'
import { SocialTab } from './tabs/SocialTab'
import {
  AppealsTab,
  AssetsTab,
  EducationTab,
  FamilyTab,
  FinanceTab,
  OtherTab,
  WorkTab,
} from './tabs/tableTabs'

export function CitizenTabs({
  person,
  patch,
  patchAddress,
  updateAttribute,
}: {
  person: Citizen
  patch: (next: Partial<Citizen>) => void
  patchAddress: (kind: 'regAddress' | 'factAddress', next: Partial<AddressBlock>) => void
  updateAttribute: (key: string, value: string) => void
}) {
  return (
    <Tabs
      items={[
        { key: 'profile', label: 'Профиль', children: <ProfileTab person={person} patch={patch} /> },
        { key: 'docs', label: 'Документы', children: <DocsTab person={person} patch={patch} /> },
        {
          key: 'contacts',
          label: 'Контакты',
          children: (
            <ContactsTab
              person={person}
              patch={patch}
              patchAddress={patchAddress}
            />
          ),
        },
        { key: 'family', label: 'Семья', children: <FamilyTab person={person} /> },
        { key: 'education', label: 'Образование', children: <EducationTab person={person} /> },
        { key: 'work', label: 'Работа', children: <WorkTab person={person} /> },
        { key: 'social', label: 'Льготы / медицина', children: <SocialTab person={person} /> },
        { key: 'military', label: 'Воинский учет', children: <MilitaryTab person={person} patch={patch} /> },
        { key: 'assets', label: 'Имущество', children: <AssetsTab person={person} /> },
        { key: 'finance', label: 'Финансы', children: <FinanceTab person={person} /> },
        { key: 'appeals', label: 'Обращения', children: <AppealsTab person={person} /> },
        { key: 'other', label: 'Прочее', children: <OtherTab person={person} /> },
        {
          key: 'extra',
          label: 'Доп. параметры',
          children: <ExtraTab person={person} updateAttribute={updateAttribute} />,
        },
      ]}
    />
  )
}
