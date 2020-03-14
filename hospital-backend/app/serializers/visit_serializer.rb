class VisitSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :patient
  attributes :id, :patient_id, :title, :date_of_visit, :doctor, :description
end
