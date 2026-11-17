import { Card } from 'antd'
import { useParams } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { EditingProvider } from '../components/FormFields'
import { useCitizenForm } from '../hooks/useCitizenForm'
import { CitizenHeader } from './citizen/CitizenHeader'
import { CitizenTabs } from './citizen/CitizenTabs'

export function CitizenPage() {
  const { id } = useParams()
  const citizenId = Number(id)
  const form = useCitizenForm(citizenId)

  if (!form.person || Number.isNaN(citizenId)) {
    return (
      <Card>
        Не нашли такого. <BackLink to="/registry">Назад</BackLink>
      </Card>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <BackLink to="/registry">Картотека</BackLink>
      </div>

      <EditingProvider editing={form.editing}>
        <CitizenHeader
          person={form.person}
          editing={form.editing}
          onEdit={form.startEdit}
          onCancel={form.cancelEdit}
          onSave={form.save}
        />

        <Card>
          <CitizenTabs
            person={form.person}
            patch={form.patch}
            patchAddress={form.patchAddress}
            updateAttribute={form.updateAttribute}
          />
        </Card>
      </EditingProvider>
    </div>
  )
}
