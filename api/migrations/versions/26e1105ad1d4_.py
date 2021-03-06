"""empty message

Revision ID: 26e1105ad1d4
Revises: f8210889f898
Create Date: 2021-03-15 15:50:38.375213

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '26e1105ad1d4'
down_revision = 'f8210889f898'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('classes', sa.Column('teacher_id', sa.Integer(), nullable=True))
    op.drop_constraint('classes_teahcer_id_fkey', 'classes', type_='foreignkey')
    op.create_foreign_key(None, 'classes', 'users', ['teacher_id'], ['id'])
    op.drop_column('classes', 'teahcer_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('classes', sa.Column('teahcer_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'classes', type_='foreignkey')
    op.create_foreign_key('classes_teahcer_id_fkey', 'classes', 'users', ['teahcer_id'], ['id'])
    op.drop_column('classes', 'teacher_id')
    # ### end Alembic commands ###
