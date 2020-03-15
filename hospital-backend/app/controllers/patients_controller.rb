class PatientsController < ApplicationController
    def index
        patients = Patient.all 
        render json: patients, include: [:visits], except: [:created_at, :updated_at]
    end

    def show
        patient = Patient.find(params[:id])
        render json: patient, include: [:visits], except: [:created_at, :updated_at]
    end

    def create
        patient = Patient.create(patient_params)
        render json: patient, include: [:visits], except: [:created_at, :updated_at]
    end

    def update
        patient.update(patient_params)
        if patient.save
            render json: patient, include: [:visits], except: [:created_at, :updated_at], status: 200
        else
            render json: {errors: patient.errors.full_messages}, status: :unprocessible_entity
        end
    end

    def destroy
        patient = Patient.find_by(id: params[:id])
        patient.destroy
        render json: patient, include: [:visits], except: [:created_at, :updated_at]
    end

    private
    def patient_params
        params.permit(:name, :sex, :gender, :age, :date_of_birth)
    end


end
