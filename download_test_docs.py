import os
from fpdf import FPDF

class DiligencePDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Diligence.dev - Automated Due Diligence Sample', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_sample_pdfs():
    print("🚀 Generating 10 synthetic financial PDFs for testing...")
    output_dir = "./test-docs"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"📁 Created directory: {output_dir}")

    samples = [
        {"name": "2022_Tax_Return.pdf", "title": "2022 Federal Income Tax Return", "content": "Entity: Sunrise Cafe & Bakery\nForm: 1120-S\nReported Gross Revenue: $487,000\nNet Income: $84,000\nOfficer Compensation: $65,000"},
        {"name": "2023_Tax_Return.pdf", "title": "2023 Federal Income Tax Return", "content": "Entity: Sunrise Cafe & Bakery\nForm: 1120-S\nReported Gross Revenue: $521,000\nNet Income: $92,000\nOfficer Compensation: $68,000"},
        {"name": "Commercial_Lease_Main_St.pdf", "title": "Commercial Lease Agreement", "content": "Property: 142 Main Street, Unit A\nLandlord: Main St Holdings LLC\nTenant: Sunrise Cafe & Bakery\nMonthly Rent: $8,500\nExpiry: March 31, 2027\nClause 12.2: Assignment requires prior written consent, withheld at Landlord's sole discretion.\nClause 4.1: Rent increases by greater of 5% or CPI annually."},
        {"name": "Bank_Statements_2023_Q4.pdf", "title": "Bank Statement - Q4 2023", "content": "Account: Business Checking ****4492\nBeginning Balance: $42,000\nTotal Deposits: $88,250\nTotal Withdrawals: $94,100\nEnding Balance: $36,150\nNote: High volume of cash withdrawals detected in December."},
        {"name": "Equipment_Schedule.pdf", "title": "Asset & Equipment Schedule", "content": "1x Espresso Machine (La Marzocco) - $12,000\n2x Industrial Ovens - $8,500 each\n1x Walk-in Refrigerator - $14,000\n12x Custom Oak Tables - $6,000 total\nAll assets reported in good working condition."},
        {"name": "Payroll_Summary_2023.pdf", "title": "Annual Payroll Summary 2023", "content": "Total Employees: 8\nTotal Wages Paid: $214,000\nPayroll Taxes: $18,400\nHealth Insurance: $12,000\nLargest Expense: Front of House Staff ($120,000)"},
        {"name": "Health_Inspection_Report.pdf", "title": "Department of Health Inspection", "content": "Date: October 12, 2023\nScore: 94/100\nViolations: Minor (Storage temperature on dairy, fixed on-site).\nStatus: PASS"},
        {"name": "Franchise_Disclosure.pdf", "title": "Franchise Disclosure Document (FDD)", "content": "Brand: Sunrise Bakeries International\nFranchise Fee: 5% of Gross Sales\nMarketing Fund: 2% of Gross Sales\nTransfer Fee: $15,000\nAgreement Term: 10 years remaining."},
        {"name": "Vendor_Agreement_Sysco.pdf", "title": "Master Supply Agreement - Sysco", "content": "Primary supplier for flour, dairy, and coffee beans.\nNet-30 terms.\nCurrent outstanding balance: $4,200.\nVolume discount: 3% if spend > $10k/month."},
        {"name": "Insurance_Policy.pdf", "title": "Business Owners Policy - General Liability", "content": "Carrier: State Farm\nCoverage: $1,000,000 / $2,000,000\nMonthly Premium: $450\nIncludes: Fire, Theft, Liability, Worker's Comp."}
    ]

    for sample in samples:
        pdf = DiligencePDF()
        pdf.add_page()
        pdf.set_font("Arial", 'B', 12)
        pdf.cell(0, 10, sample["title"], 0, 1)
        pdf.ln(5)
        pdf.set_font("Arial", '', 10)
        pdf.multi_cell(0, 10, sample["content"])
        
        file_path = os.path.join(output_dir, sample["name"])
        pdf.output(file_path)
        print(f"✅ Generated: {file_path}")

    print(f"\n✨ All 10 synthetic PDFs generated in {output_dir}")

if __name__ == '__main__':
    generate_sample_pdfs()
