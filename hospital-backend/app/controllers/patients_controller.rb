class PatientsController < ApplicationController
    def index
        patients = Patient.all 
        render json: patients, include: [:visits]
    end

    def show
        patient = Patient.find(params[:id])
        render json: patient
    end

    def create
        patient = Patient.create(patient_params)
        render json: patient
    end

    def update
        patient.update(patient_params)
        render json: patient
    end

    def destroy
        patient = Patient.find(params[:id])
        patient.destroy
        render json: patient
    end

    private
    def patient_params
        params.permit(:name, :sex, :gender, :age, :date_of_birth)
    end


end
