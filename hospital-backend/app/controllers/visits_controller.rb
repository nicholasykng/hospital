class VisitsController < ApplicationController
    def index
        visits = Visit.all 
        render json: visits, except: [:created_at, :updated_at]
    end

    def show
        visit = Visit.find(params[:id])
        render json: visit, except: [:created_at, :updated_at]
    end

    def create
        visit = Visit.create(visit_params)
        render json: visit, except: [:created_at, :updated_at]
    end

    def update
        visit = Visit.find_by(id: params[:id])
        visit.update(visit_params)
        render json: visit, except: [:created_at, :updated_at]
        
    end

    def destroy
        visit = Visit.find_by(id: params[:id])
        visit.destroy
        render json: visit, except: [:created_at, :updated_at]
    end

    private
    def visit_params
        params.permit(:title, :date_of_visit, :doctor, :description, :patient_id)
    end

end
