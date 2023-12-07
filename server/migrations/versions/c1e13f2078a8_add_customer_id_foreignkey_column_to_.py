"""Add customer_id ForeignKey column to reviews table

Revision ID: c1e13f2078a8
Revises: 23af01b276a2
Create Date: 2023-12-06 11:27:48.609716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c1e13f2078a8'
down_revision = '23af01b276a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('customer_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_reviews_customer_id_customers'), 'customers', ['customer_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_reviews_customer_id_customers'), type_='foreignkey')
        batch_op.drop_column('customer_id')

    # ### end Alembic commands ###