class PatientSerializer
  include FastJsonapi::ObjectSerializer
  has_many :visits
  attributes :id, :name, :sex, :gender, :age, :date_of_birth
end
